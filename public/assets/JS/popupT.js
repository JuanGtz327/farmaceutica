const trabajador=[]
trabajador.push(document.getElementById('btnAgr_T'), document.getElementById('overlayAgr_T'), document.getElementById('btnCloseAgr_T'),
    document.getElementById('btnEdi_T'),document.getElementById('overlayEdi_T'),document.getElementById('btnCloseEdi_T'),
    document.getElementById('btnEli_T'),document.getElementById('overlayEli_T'),document.getElementById('btnCloseEli_T'));    


trabajador[0].addEventListener('click' , function(){
    trabajador[1].classList.add('active');
});
trabajador[2].addEventListener('click' , function(){
    trabajador[1].classList.remove('active');
});
trabajador[3].addEventListener('click' , function(){
    trabajador[4].classList.add('active');
});
trabajador[5].addEventListener('click' , function(){
    trabajador[4].classList.remove('active');
});
trabajador[6].addEventListener('click' , function(){
    trabajador[7].classList.add('active');
});
trabajador[8].addEventListener('click' , function(){
    trabajador[7].classList.remove('active');
});
    
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
    
    