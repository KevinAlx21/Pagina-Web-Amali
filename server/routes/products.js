import express from "express";
import multer from "multer";
import CATEGORIES from "../data/categories.js";
import { supabase } from "../supabaseClient.js";
import { optimizeImage } from "../utils/image.js";

const router = express.Router();


// ======================
// Configuración Multer
// ======================

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // máximo 10MB
  },

  fileFilter: (req, file, cb) => {

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg"
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no permitido"));
    }

  }
});



// ======================
// GET Productos
// ======================

router.get("/", async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false
      });


    if (error) throw error;


    res.json(data);


  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

});




// ======================
// GET Categorías
// ======================

router.get("/categories", (req, res)=>{

  res.json(CATEGORIES);

});




// ======================
// POST Crear producto
// ======================


router.post("/", upload.single("image"), async(req,res)=>{

try{


const {
  name,
  description,
  price,
  category
}=req.body;



if(!req.file){

 return res.status(400).json({
   error:"Debe seleccionar una imagen"
 });

}




const validCategory =
CATEGORIES.find(
 c=>c.value===category
);



if(!validCategory){

 return res.status(400).json({
   error:"Categoría inválida"
 });

}



// Optimizar imagen

const optimizedImage =
await optimizeImage(
 req.file.buffer
);




// Nombre único

const fileName =
`${Date.now()}.webp`;




// Subir a Storage


const {
 error:uploadError
}=await supabase.storage
.from("products")
.upload(
 fileName,
 optimizedImage,
 {
   contentType:"image/webp"
 }
);



if(uploadError)
 throw uploadError;




// URL pública

const {
 data:{
  publicUrl
 }
}=supabase.storage
.from("products")
.getPublicUrl(fileName);




// Guardar producto

const {
 data,
 error
}=await supabase
.from("products")
.insert({

 name,
 description,

 price:Number(price),

 category,

 image:publicUrl

})
.select()
.single();



if(error)
 throw error;



res.status(201).json(data);



}catch(err){

console.error(err);

res.status(500).json({
 error:err.message
});


}


});





// ======================
// PUT Producto
// ======================
router.put("/:id", upload.single("image"), async (req, res) => {

  try {

    // Buscar producto actual
    const { data: oldProduct, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", req.params.id)
      .single();


    if (findError || !oldProduct) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }



    const updates = {};


    if (req.body.name)
      updates.name = req.body.name;


    if (req.body.description)
      updates.description = req.body.description;


    if (req.body.price)
      updates.price = Number(req.body.price);


    if (req.body.category)
      updates.category = req.body.category;



    // ============================
    // SI CAMBIA LA IMAGEN
    // ============================

    if (req.file) {


      // Crear nombre nuevo
      const fileName = `${Date.now()}.webp`;


      // Subir nueva imagen

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(
          fileName,
          req.file.buffer,
          {
            contentType: req.file.mimetype
          }
        );


      if (uploadError) throw uploadError;



      const {
        data:{publicUrl}
      } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);



      updates.image = publicUrl;



      // ============================
      // BORRAR IMAGEN ANTIGUA
      // ============================


      if(oldProduct.image){


        const oldFileName = oldProduct.image
          .split("/")
          .pop();



        const { error: deleteError } =
          await supabase.storage
          .from("products")
          .remove([
            oldFileName
          ]);



        if(deleteError){

          console.log(
            "No se pudo borrar imagen antigua:",
            deleteError.message
          );

        }


      }


    }



    // Actualizar producto

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", req.params.id)
      .select()
      .single();



    if(error) throw error;



    res.json(data);



  } catch(err){

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

});




// ======================
// DELETE Producto + Imagen Storage
// ======================

router.delete("/:id", async(req,res)=>{

try{


// 1. Buscar producto antes de eliminar

const {
data: product,
error: findError
}=await supabase
.from("products")
.select("image")
.eq("id",req.params.id)
.single();



if(findError){

throw findError;

}




// 2. Obtener nombre del archivo

if(product?.image){


const imageUrl = product.image;


// ejemplo:
// https://xxx.supabase.co/storage/v1/object/public/products/173928382.webp


const fileName =
imageUrl.split("/").pop();



console.log(
"Eliminando imagen:",
fileName
);




// 3. Borrar imagen Storage


const {
error:storageError
}=await supabase.storage
.from("products")
.remove([
fileName
]);



if(storageError){

console.error(
"Error eliminando imagen:",
storageError
);

}



}





// 4. Borrar producto BD


const {
error
}=await supabase
.from("products")
.delete()
.eq(
"id",
req.params.id
);



if(error)
throw error;




res.json({

message:
"Producto e imagen eliminados correctamente"

});



}catch(err){


console.error(err);


res.status(500).json({

error:err.message

});


}


});

export default router;