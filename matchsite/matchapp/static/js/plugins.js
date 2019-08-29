$(document).ready(function(){
  var ShowForm = function(){
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType:'json',
      beforeSend: function(){
        $('#modal-product').modal('show');
      },
      success: function(data){
        $('#modal-product .modal-content').html(data.html_form);
      }
    });
  };

  var SaveForm =  function(){
    var form = $(this);
    $.ajax({
      url: form.attr('data-url'),
      data: form.serialize(),
      type: form.attr('method'),
      dataType: 'json',
      success: function(data){
        if(data.form_is_valid){
          $('#product-table tbody').html(data.product_list);
          $('#modal-product').modal('hide');
        } else {
          $('#modal-product .modal-content').html(data.html_form)
        }
      }
    })
    return false;
  }

// create 
$(".show-form").click(ShowForm);
$("#modal-product").on("submit",".create-form",SaveForm);

//update
$('#product-table').on("click",".show-form-update",ShowForm);
$('#modal-product').on("submit",".update-form",SaveForm)

//delete
$('#product-table').on("click",".show-form-delete",ShowForm);
$('#modal-product').on("submit",".delete-form",SaveForm)
});