// Arreglo para los botones de los productos.
const productos=[]
productos.push(document.getElementById('btnAgr_P'), document.getElementById('overlayAgr_P'), document.getElementById('btnCloseAgr_P'),
    document.getElementById('btnEdi_P'),document.getElementById('overlayEdi_P'),document.getElementById('btnCloseEdi_P'),
    document.getElementById('btnEli_P'),document.getElementById('overlayEli_P'),document.getElementById('btnCloseEli_P'));    

// Funciones para el boton de productos.
productos[0].addEventListener('click' , function(){
    productos[1].classList.add('active');
});
productos[2].addEventListener('click' , function(){
    productos[1].classList.remove('active');
});
productos[3].addEventListener('click' , function(){
    productos[4].classList.add('active');
});
productos[5].addEventListener('click' , function(){
    productos[4].classList.remove('active');
});
productos[6].addEventListener('click' , function(){
    productos[7].classList.add('active');
});
productos[8].addEventListener('click' , function(){
    productos[7].classList.remove('active');
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })