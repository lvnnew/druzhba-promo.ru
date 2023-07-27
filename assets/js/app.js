	//персональные обработчики форм
	
	/* ================================================================================================= */			
	//форма авторизации	
	ajaxForms.push({
		id: 'formAuth',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
			//normalize login field
			for(key in arr)
			{
				if (arr[key].name == 'login')
				{
					arr[key].value = arr[key].value.replace(/[^\d]/g,'');
					break;
				}						
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			document.location.href = 'lk';			
		}			
	});
		
	/* ================================================================================================= */
	//форма регистрации участника
	ajaxForms.push({
		id: 'formReg',
		init: function () 
		{
			$("#formReg input[name=city]").autocomplete({
				source: function( request, response ) {
					$('#formReg input[name=country]').val('');
					$('#formReg input[name=region]').val('');
					$('#formReg input[name=area]').val('');
					$('#formReg input[name=settlement]').val('');
					
					$.ajax({
						url: "https://cp.i-actions.ru/reports2/get.php",
						dataType: "jsonp",
						data: {
							act: "get_addr_by_search",
							country: [1],
							search: request.term
						},
						success: function( data ) {
							response( $.map( data, function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					
					$('#formReg input[name=country]').val(ui.item.data.country);
					$('#formReg input[name=region]').val(ui.item.data.region);
					$('#formReg input[name=area]').val(ui.item.data.area);
					$('#formReg input[name=settlement]').val(ui.item.data.settlement);						
					
					$('#formReg input[name=addr]').val(ui.item.label);

					// $('#formReg select[name=street]').addClass("ui-autocomplete-loading");				
					// $.ajax({
						// type:'GET',
						// url:url,
						// data:{act:'get_street',country:ui.item.data.country,region:ui.item.data.region,area:ui.item.data.area,settlement:ui.item.data.settlement,street:$('#formReg select[name=street] option:selected').val()},
						// dataType:'jsonp',
						// success:function(data){
							// $('#formReg select[name=street]').removeClass('ui-autocomplete-loading');
							// parse_get_data($('#formReg select[name=street]'),data);
						// }
					// });			
				}
			});		
		},
		beforeSubmit: function (arr, $form, options)
		{
			if (typeof $form.find('input[name=sex]:checked' ).val() == 'undefined'){
				bootbox.alert('Укажите пол!');
				return false;
			}       
			if ($form.find('input[name=settlement]').val() == '')
			{
				$form.find('input[name=city]').val('');
				bootbox.alert('Выберите город проживания из списка!');
				return false;
			}                        
			if (!$form.find('input[name=confirm1]').is(':checked'))
			{
				bootbox.alert('Подтвердите согласие с правилами акции!');
				return false;
			}			
			if (!$form.find('input[name=confirm2]').is(':checked'))
			{
				bootbox.alert('Подтвердите достижение 18-и летнего возраста!');
				return false;
			}				
		},
		success: function (responseText, statusText, xhr, $form)
		{
			$('#modal-reg').modal('hide');	
			$('#modal-success #regAnswer').html(responseText.message);
			$('#modal-success').modal('show');
			
/* 			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					// $form.find('img.captcha').attr('src', 'api/captcha?r=' + Math.random());					
					
				}
			});
 */		
		}			
	});
	
	/* ================================================================================================= */	
	//форма восстановления пароля
	ajaxForms.push({			
		id: 'formRestore',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
			//normalize login field
			for(key in arr)
			{
				if (arr[key].name == 'login')
				{
					arr[key].value = arr[key].value.replace(/[^\d]/g,'');
					break;
				}						
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			// $form.find('img.captcha').attr('src', 'api/captcha?r=' + Math.random());					
			$('#modal-recovery').modal('hide');
			
			bootbox.alert({
				message: responseText.message + ' '
			});				
		}			
	});
	
	/* ================================================================================================= */
	//форма обратной связи
	ajaxForms.push({
		id: 'formFeedback',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
			if (!$form.find('input[name=confirm1]').is(':checked'))
			{
				bootbox.alert('Подтвердите согласие с предоставлением персональных данных!');
				return false;
			}			
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert(responseText.message + ' ', function() {
				// load_tableFeedbackList();
				// document.location.reload();
			});   	 
		}			
	});
	
	/* ================================================================================================= */		
	//форма регистрации кода
	ajaxForms.push({
		id: 'formCodeReg',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
			if (!$form.find('input[name=fn]').val().match(/^[\d]+$/i) )
			{
				bootbox.alert('ФН должен состоять только из цифр!');
				$form.find('input[name=fn]').addClass('is-invalid');
				return false;				
			}
			if (!$form.find('input[name=fd]').val().match(/^[\d]+$/i) )
			{
				bootbox.alert('ФД должен состоять только из цифр!');
				$form.find('input[name=fd]').addClass('is-invalid');
				return false;				
			}
			if (!$form.find('input[name=fpd]').val().match(/^[\d]+$/i) )
			{
				bootbox.alert('ФПД должен состоять только из цифр!');
				$form.find('input[name=fpd]').addClass('is-invalid');
				return false;				
			}
			if ($('#uploadCheck').val() == "")
			{
				bootbox.alert('Отсутствует фото чека! Пожалуйста, загрузите фото. Не используйте перенос файла на поле загрузки: фото добавляется путем нажатия на поле загрузки и выбора файла из памяти устройства.');
				return false;				
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			CodePause = responseText.codePause;
			setCodePause($form.find('input[name=code]').next());
			bootbox.alert(responseText.message + ' ', function() {
				document.location.reload();
			});			
		}			
	});
	
	/* ================================================================================================= */		
	//форма редактирования профайла
	ajaxForms.push({
		id: 'formProfile',
		init: function () 
		{	
			$('#formProfile input[name=birthday]').datepicker({
				format: "dd.mm.yyyy",
				startView: 2,
				language: "ru",
				endDate: "-18y",
				keyboardNavigation: false,
				forceParse: false,
				autoclose: true,
				todayHighlight: true
			});	
			
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_addr_str',country:$('#formProfile input[name=country]').val(),region:$('#formProfile input[name=region]').val(),area:$('#formProfile input[name=area]').val(),settlement:$('#formProfile input[name=settlement]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formProfile input[name=city]').val(data.txt);
						$('#formProfile input[name=city]').attr('title',data.txt);
						$('#formProfile input[name=addr]').val(data.txt);			
					}
			});			
			
			$('#formProfile select[name=street]').addClass("ui-autocomplete-loading");				
			$.ajax({
				type:'GET',
				url: "https://cp.i-actions.ru/reports2/get.php",
				data:{act:'get_street',country:$('#formProfile input[name=country]').val(),region:$('#formProfile input[name=region]').val(),area:$('#formProfile input[name=area]').val(),settlement:$('#formProfile input[name=settlement]').val(),street:$('#formProfile select[name=street] option:selected').val()},
				dataType:'jsonp',
				success:function(data){
					$('#formProfile select[name=street]').removeClass('ui-autocomplete-loading');
					parse_get_data($('#formProfile select[name=street]'),data);
				}
			});		
		
			$("#formProfile input[name=city]").autocomplete({
				source: function( request, response ) {
					$('#formProfile input[name=country]').val('');
					$('#formProfile input[name=region]').val('');
					$('#formProfile input[name=area]').val('');
					$('#formProfile input[name=settlement]').val('');
					$('#formProfile select[name=street]').empty();
					
					$.ajax({
						url: "https://cp.i-actions.ru/reports2/get.php",
						dataType: "jsonp",
						data: {
							act: "get_addr_by_search",
							country: [1],
							search: request.term
						},
						success: function( data ) {
							response( $.map( data, function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					
					$('#formProfile input[name=country]').val(ui.item.data.country);
					$('#formProfile input[name=region]').val(ui.item.data.region);
					$('#formProfile input[name=area]').val(ui.item.data.area);
					$('#formProfile input[name=settlement]').val(ui.item.data.settlement);						
					
					$('#formProfile input[name=addr]').val(ui.item.label);

					$('#formProfile select[name=street]').addClass("ui-autocomplete-loading");				
					$.ajax({
						type:'GET',
						url: "https://cp.i-actions.ru/reports2/get.php",
						data:{act:'get_street',country:ui.item.data.country,region:ui.item.data.region,area:ui.item.data.area,settlement:ui.item.data.settlement,street:$('#formProfile select[name=street] option:selected').val()},
						dataType:'jsonp',
						success:function(data){
							$('#formProfile select[name=street]').removeClass('ui-autocomplete-loading');
							parse_get_data($('#formProfile select[name=street]'),data);
						}
					});			
				}
			});

			$('#formProfile').on('change', 'input[name=dom]', function(e) {
				$.ajax({
					type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_postcode',street:$('#formProfile select[name=street] option:selected').val(),dom:$('#formProfile input[name=dom]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formProfile input[name=postcode]').val(data);
					}
				});				
			});
		},
		beforeSubmit: function (arr, $form, options)
		{
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		}			
	});

	/* ================================================================================================= */
	//форма заказа приза
	ajaxForms.push({
		id: 'formOrder',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert(responseText.message + ' ', function() {
				document.location.reload();
			});   	 
		}			
	});
	
	/* ================================================================================================= */
	//форма 
	ajaxForms.push({
		id: 'formPersonal',
		init: function () 
		{
			
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_addr_str',country:$('#formPersonal input[name=country]').val(),region:$('#formPersonal input[name=region]').val(),area:$('#formPersonal input[name=area]').val(),settlement:$('#formPersonal input[name=settlement]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formPersonal input[name=city]').val(data.txt);
						$('#formPersonal input[name=city]').attr('title',data.txt);
						$('#formPersonal input[name=addr]').val(data.txt);			
					}
			});			
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_street',country:$('#formPersonal input[name=country]').val(),region:$('#formPersonal input[name=region]').val(),area:$('#formPersonal input[name=area]').val(),settlement:$('#formPersonal input[name=settlement]').val(),street:$('#formPersonal select[name=street] option:selected').val()},
					dataType:'jsonp',
					success:function(data){
						parse_get_data($('#formPersonal select[name=street]'),data);
						$('#formPersonal select[name=p_street]').trigger('refresh');
					}
			});	  
	
			$("#formPersonal input[name=city]").autocomplete({
				source: function( request, response ) {
					$('#formPersonal input[name=country]').val('');
					$('#formPersonal input[name=region]').val('');
					$('#formPersonal input[name=area]').val('');
					$('#formPersonal input[name=settlement]').val('');
					$('#formPersonal select[name=street]').empty();
					
					$.ajax({
						url: "https://cp.i-actions.ru/reports2/get.php",
						dataType: "jsonp",
						data: {
							act: "get_addr_by_search",
							country: [1],
							search: request.term
						},
						success: function( data ) {
							response( $.map( data, function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					
					$('#formPersonal input[name=country]').val(ui.item.data.country);
					$('#formPersonal input[name=region]').val(ui.item.data.region);
					$('#formPersonal input[name=area]').val(ui.item.data.area);
					$('#formPersonal input[name=settlement]').val(ui.item.data.settlement);						
					
					$('#formPersonal input[name=addr]').val(ui.item.label);

					$('#formPersonal select[name=street]').addClass('ui-autocomplete-loading');
				
					$.ajax({
						type:'GET',
						url: "https://cp.i-actions.ru/reports2/get.php",
						data:{act:'get_street',country:ui.item.data.country,region:ui.item.data.region,area:ui.item.data.area,settlement:ui.item.data.settlement,street:$('#formPersonal select[name=street] option:selected').val()},
						dataType:'jsonp',
						success:function(data){
							$('#formPersonal select[name=street]').removeClass('ui-autocomplete-loading');
							parse_get_data($('#formPersonal select[name=street]'),data);
							$('#formPersonal select[name=street]').trigger('refresh');
						}
					});			
					
				}
			});	

			// $('#formPersonal').on('change', 'input[name=dom]', function(e) {
				// $.ajax({
					// type:'GET',
					// url:"https://cp.i-actions.ru/reports2/get.php",
					// data:{act:'get_postcode',street:$('#formPersonal select[name=street] option:selected').val(),dom:$('#formPersonal input[name=dom]').val()},
					// dataType:'jsonp',
					// success:function(data){
						// $('#formPersonal input[name=postcode]').val(data);
					// }
				// });				
			// });
			
		},
		beforeSubmit: function (arr, $form, options)
		{
			if ($form.find('select[name=sex] option:selected').val() == ""){
				bootbox.alert('Укажите пол!');
				return false;
			}                        
			if ($form.find('input[name=settlement]').val() == "")
			{
				$form.find('input[name=city]').val('');
				bootbox.alert('Не указан город регистрации!');
				return false;
			}
			if (!innCheck($form.find('input[name=inn]').val()))
			{
				bootbox.alert('Некорректный ИНН!');
				return false;
			}	
			// if ($form.find('input[name="file[]"]').val() == "")
			// {
				// bootbox.alert('Отсутствуют фото!');
				// return false;				
			// }
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		},
	});
	
	ajaxForms.push({
		id: 'formAddress',
		init: function () 
		{
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_addr_str',country:$('#formAddress input[name=p_country]').val(),region:$('#formAddress input[name=p_region]').val(),area:$('#formAddress input[name=p_area]').val(),settlement:$('#formAddress input[name=p_settlement]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formAddress input[name=p_city]').val(data.txt);
						$('#formAddress input[name=p_city]').attr('title',data.txt);
						$('#formAddress input[name=p_addr]').val(data.txt);			
					}
			});			
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_street',country:$('#formAddress input[name=p_country]').val(),region:$('#formAddress input[name=p_region]').val(),area:$('#formAddress input[name=p_area]').val(),settlement:$('#formAddress input[name=p_settlement]').val(),street:$('#formAddress select[name=p_street] option:selected').val()},
					dataType:'jsonp',
					success:function(data){
						parse_get_data($('#formAddress select[name=p_street]'),data);
						$('#formAddress select[name=p_street]').selectpicker('refresh');
					}
			});	  
	
			$("#formAddress input[name=p_city]").autocomplete({
				source: function( request, response ) {
					$('#formAddress input[name=p_country]').val('');
					$('#formAddress input[name=p_region]').val('');
					$('#formAddress input[name=p_area]').val('');
					$('#formAddress input[name=p_settlement]').val('');
					$('#formAddress select[name=p_street]').empty();
					
					$.ajax({
						url: "https://cp.i-actions.ru/reports2/get.php",
						dataType: "jsonp",
						data: {
							act: "get_addr_by_search",
							country: [1],
							search: request.term
						},
						success: function( data ) {
							response( $.map( data, function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					
					$('#formAddress input[name=p_country]').val(ui.item.data.country);
					$('#formAddress input[name=p_region]').val(ui.item.data.region);
					$('#formAddress input[name=p_area]').val(ui.item.data.area);
					$('#formAddress input[name=p_settlement]').val(ui.item.data.settlement);						
					
					$('#formAddress input[name=p_addr]').val(ui.item.label);

					$('#formAddress select[name=p_street]').addClass('ui-autocomplete-loading');
				
					$.ajax({
						type:'GET',
						url: "https://cp.i-actions.ru/reports2/get.php",
						data:{act:'get_street',country:ui.item.data.country,region:ui.item.data.region,area:ui.item.data.area,settlement:ui.item.data.settlement,street:$('#formAddress select[name=p_street] option:selected').val()},
						dataType:'jsonp',
						success:function(data){
							$('#formAddress select[name=p_street]').removeClass('ui-autocomplete-loading');
							parse_get_data($('#formAddress select[name=p_street]'),data);
							$('#formAddress select[name=p_street]').selectpicker('refresh');
						}
					});			
					
				}
			});		
			
			$('#formAddress').on('change', 'input[name=p_dom]', function(e) {
				$.ajax({
					type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_postcode',street:$('#formAddress select[name=p_street] option:selected').val(),dom:$('#formAddress input[name=p_dom]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formAddress input[name=p_postcode]').val(data);
					}
				});				
			});
			
		},
		beforeSubmit: function (arr, $form, options)
		{
			if ($form.find('input[name=p_settlement]').val() == "")
			{
				$form.find('input[name=p_city]').val('');
				bootbox.alert('Не указан город!');
				return false;
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		},
	});
	
	
	
	function parse_get_data(object,data)
	{
		object.empty().css('opacity','1').append("<option value=''>");

		if (data['data'].length)
		{
			for (optgrp in data['data'])
			{
				elem = jQuery("<optgroup label='"+data['data'][optgrp][0]+"'>");

				for(key in data['data'][optgrp][1]) {
					elem.append("<option value='"+data['data'][optgrp][1][key][0]+"'>"+data['data'][optgrp][1][key][1]);
				}

				object.append(elem);
			}
			for(key in data['selectedIndex']) 
			{
				object.find('option[value='+data['selectedIndex'][key]+']').attr('selected','true');
			}
		}
		else
			object.append("<option value='0'>Нет данных</option>");
			
		return ;
	}		
	
	//регистрация кода		
	function setCodePause(field) 
	{
		parent = $(field).closest('.form-group');
		form = $(field).closest('form');
		
		if (CodePause <= 0)       
		{
			field.html('Заполните это поле');
			$(field).removeClass('is-invalid');
			form.removeClass('validated');
		}
		else
		{			
			if (!$(field).hasClass('is-invalid'))
				$(field).addClass('is-invalid');			
			
			field.html('Подождите ' + CodePause + ' сек.');
			setTimeout(function() { setCodePause(field); }, 1000);
		}
		CodePause--;

		return ;
	}	