const fs = require('fs'); // Importamos la librería fileSystem

const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatibus consequatur porro pariatur quae vitae. Dolor, eaque! Omnis ducimus unde optio repellendus velit, voluptate quidem quae tempore qui dolorem fugiat!"

// Crear un archivo en la ruta raiz del proyecto
fs.writeFile('archivo.txt', content, (err) => {
    if (err){
        console.log(err);
        return;
    }
    console.log('Archivo creado!');
});