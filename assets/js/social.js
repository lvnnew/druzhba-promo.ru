	function loadRegFormData(token, user)
	{
		var form = $('#formReg');

		birthday = new Array();
			
		$(form).find('input[name=token]').val(token);
		
		$(form).find('input[name=fam]').val(user['last_name']);
		$(form).find('input[name=im]').val(user['first_name']);
		// $(form).find('input[name=passwd1]').remove();
		// $(form).find('input[name=passwd2]').remove();
		
		$(form).find('input[name=sex]').attr('checked', false);
		if (user['sex'] == 2)
			$(form).find('input[name=sex][value=t]').attr('checked', true);
		if (user['sex'] == 1)
			$(form).find('input[name=sex][value=f]').attr('checked', true);
			
		$(form).find('input[name=email]').val(user['email']);
		
 		if (typeof (user['bdate']) != 'undefined')
		{
			birthday[0] = ((user['bdate'].split('.')[0]).length < 2 ? '0':'') + user['bdate'].split('.')[0];
			birthday[1] = ((user['bdate'].split('.')[1]).length < 2 ? '0':'') + user['bdate'].split('.')[1];
			birthday[2] = ((user['bdate'].split('.')[2]).length < 3 ? '19':'') + user['bdate'].split('.')[2];
		}
		
		$(form).find('input[name=birthday]').val(birthday.join('.'));
		$(form).find('input[name=city]').val(user['city']);
		$(form).find('input[name=city]').autocomplete('search',user['city']);			
 	}

	function ulogin_func(token)
	{
		$.ajax({
			url:'//ulogin.ru/token.php',
			data: {
				token:token,
				host:'druzhba-promo.ru'
			},
			dataType: 'jsonp',
			success: function(data) {
				var user = JSON.parse(data);			
				
				$.ajax({
					url: '/api/user/auth',
					method: 'POST',
					data: {						
						token: token
					},
					success: function(data) {
						document.location.href = '/lk';
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$('#modal-enter').modal('hide');
						$('#modal-reg').modal('show');
						loadRegFormData(token, user);
						bootbox.alert('Дозаполните форму регистрации!');
					}					
				});
				
			}
		});
	}			  