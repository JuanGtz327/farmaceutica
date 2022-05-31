// Arreglo para los botones de los productos.
const logi=[]
logi.push(document.getElementById('btnAgr_logi'), document.getElementById('overlayAgr_logi'), document.getElementById('btnCloseAgr_logi'),
    document.getElementById('btnEdi_logi'),document.getElementById('overlayEdi_logi'),document.getElementById('btnCloseEdi_logi'),
    document.getElementById('btnEli_logi'),document.getElementById('overlayEli_logi'),document.getElementById('btnCloseEli_logi'));    

// Funciones para el boton de productos.
logi[0].addEventListener('click' , function(){
    logi[1].classList.add('active');
});
logi[2].addEventListener('click' , function(){
    logi[1].classList.remove('active');
});
logi[3].addEventListener('click' , function(){
    logi[4].classList.add('active');
});
logi[5].addEventListener('click' , function(){
    logi[4].classList.remove('active');
});
logi[6].addEventListener('click' , function(){
    logi[7].classList.add('active');
});
logi[8].addEventListener('click' , function(){
    logi[7].classList.remove('active');
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })