import express from "express";
import multer from "multer";
import { supabase } from "../supabaseClient.js";
import { optimizeImage } from "../utils/image.js";

const router = express.Router();


// ======================
// Configuración Multer
// ======================

const storage = multer.memoryStorage();

const upload = multer({

  storage,

  limits:{
    fileSize:10 * 1024 * 1024
  },

  fileFilter:(req,file,cb)=>{

    const allowed=[
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg"
    ];


    if(allowed.includes(file.mimetype)){
      cb(null,true);
    }else{
      cb(new Error("Formato de imagen no permitido"));
    }

  }

});



// ======================
// GET Productos
// ======================

router.get("/", async(req,res)=>{

try{

const {data,error}=await supabase
.from("products")
.select("*")
.order("created_at",{
 ascending:false
});


if(error) throw error;


res.json(data);


}catch(err){

console.error(err);

res.status(500).json({
 error:err.message
});

}

});





// ======================
// GET Categorías
// ======================

router.get("/categories", async(req,res)=>{

try{


const {data,error}=await supabase
.from("categories")
.select("*")
.order("name");


if(error) throw error;



const categories=data.map(cat=>({

 value:cat.slug,
 label:cat.name

}));



res.json(categories);



}catch(err){

console.error(err);

res.status(500).json({
 error:err.message
});


}


});






// ======================
// POST Crear producto
// ======================

router.post("/",upload.single("image"),async(req,res)=>{


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




// validar categoría

const {
data:categoryExists,
error:categoryError

}=await supabase
.from("categories")
.select("slug")
.eq("slug",category)
.single();



if(categoryError || !categoryExists){

return res.status(400).json({

error:"Categoría inválida"

});

}





// optimizar imagen

const optimizedImage=
await optimizeImage(
req.file.buffer
);




// nombre archivo

const fileName=
`${Date.now()}.webp`;




// subir imagen

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






// guardar producto

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
// PUT Actualizar producto
// ======================

router.put("/:id",upload.single("image"),async(req,res)=>{


try{


const {
data:oldProduct,
error:findError

}=await supabase
.from("products")
.select("*")
.eq("id",req.params.id)
.single();



if(findError || !oldProduct){

return res.status(404).json({

error:"Producto no encontrado"

});

}




const updates={};



if(req.body.name)
updates.name=req.body.name;



if(req.body.description)
updates.description=req.body.description;



if(req.body.price)
updates.price=Number(req.body.price);



if(req.body.category){

const {
data:cat,
error

}=await supabase
.from("categories")
.select("slug")
.eq("slug",req.body.category)
.single();


if(error || !cat){

return res.status(400).json({

error:"Categoría inválida"

});

}


updates.category=req.body.category;


}






// nueva imagen

if(req.file){



const optimizedImage=
await optimizeImage(
req.file.buffer
);



const fileName=
`${Date.now()}.webp`;



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




const {
data:{
publicUrl

}

}=supabase.storage
.from("products")
.getPublicUrl(fileName);



updates.image=publicUrl;





// borrar imagen anterior


if(oldProduct.image){


const oldFile=
oldProduct.image
.split("/")
.pop();



await supabase.storage
.from("products")
.remove([
oldFile
]);


}


}




const {
data,
error

}=await supabase
.from("products")
.update(updates)
.eq("id",req.params.id)
.select()
.single();



if(error)
throw error;



res.json(data);



}catch(err){


console.error(err);


res.status(500).json({

error:err.message

});


}


});








// ======================
// DELETE Producto
// ======================

router.delete("/:id",async(req,res)=>{


try{


const {
data:product,
error

}=await supabase
.from("products")
.select("image")
.eq("id",req.params.id)
.single();



if(error)
throw error;



if(product?.image){


const fileName=
product.image
.split("/")
.pop();



await supabase.storage
.from("products")
.remove([
fileName
]);


}





const {
error:deleteError

}=await supabase
.from("products")
.delete()
.eq(
"id",
req.params.id
);



if(deleteError)
throw deleteError;



res.json({

message:"Producto eliminado correctamente"

});



}catch(err){


console.error(err);


res.status(500).json({

error:err.message

});


}


});



export default router;