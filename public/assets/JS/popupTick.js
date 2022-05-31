const ticket=[]
ticket.push(document.getElementById('btnAgr_Tick'), document.getElementById('overlayAgr_Tick'), document.getElementById('btnCloseAgr_Tick'),
    document.getElementById('btnEdi_Tick'),document.getElementById('overlayEdi_Tick'),document.getElementById('btnCloseEdi_Tick'),
    document.getElementById('btnEli_Tick'),document.getElementById('overlayEli_Tick'),document.getElementById('btnCloseEli_Tick'));    


ticket[0].addEventListener('click' , function(){
        ticket[1].classList.add('active');
});
ticket[2].addEventListener('click' , function(){
    ticket[1].classList.remove('active');
});
ticket[3].addEventListener('click' , function(){
    ticket[4].classList.add('active');
});
ticket[5].addEventListener('click' , function(){
    ticket[4].classList.remove('active');
});
ticket[6].addEventListener('click' , function(){
    ticket[7].classList.add('active');
});
ticket[8].addEventListener('click' , function(){
    ticket[7].classList.remove('active');
});
    
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
    
    