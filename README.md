![websiteLogo](img/coreImg/logo.png)

---

This website is mainly used to promote and introduce different games so that viewers can immediately follow different game information. The website will introduce different game introductions, game reviews, related articles, etc., which will surely meet your different needs.

Overview for the API
---

- 1. USER LOGIN
- 2. USER REGISTER
- 3. SHOW FAVOURITE LIST
- 4. ADD ITEM IN FAVOURITE LIST
- 5. REMOVE ITEM IN FAVOURITE LIST

If you want to study the source code of this website, there come the Github full source code link:
https://github.com/ktwwong/KTgames
Or, if you want to listen to the aurthor demostration, there come the youtube presentation link:
https://www.youtube.com/

APIs call/input/output
---

##1. User Login

You can call this api to check if there have an account. Input the `email` and `password` to login.
```
{
	url: "http://127.0.0.1:4242/Login",
	type: "POST",
	data: "email="+tempEmail+"&"+"password="+tempPassword   
	Result 
	{
		result = username
	}
	Error 
	{
		result = "false"
	}
}
```
##2. User Register

You can call this api to register an account. Input the `email`, `username` and `password` to create an account.
```
{
	url: "http://127.0.0.1:4242/Register",
	type: "POST",
	data: "email="+tempEmail+"&"+"username="+tempName+"&"+"password="+tempPassword   
	Result
	{
		"email": 't@t.com',
		"username": 'tester',
		"password": '123',
		"id": '0'
	}
	Error 
	{
		result = "false"
	}
}
```
3. Show Favourite List

You can call this api to show the saved content of the account. Load the `username` to show the favourite item saved in account.

{
	url: "http://127.0.0.1:4242/Favourlist",
	type: "POST",
	data: "username="+username
	Result 
	{
		result = 
		[
			{ _id: 5cc34c1bad489a434027aa6d,
				username: 'tester',
				like: '1',
				id: '0' },
			  { _id: 5cc34c24ad489a434027aa6f,
				username: 'tester',
				like: '3',
				id: '0' },
			  { _id: 5cc3572716fd800fc0642847,
				username: 'tester',
				like: '2',
				id: '0' },
			  { _id: 5cc879545a9e230608369d12,
				username: 'tester',
				like: '4',
				id: '0' },
			  { _id: 5cc879ad5a9e230608369d14,
				username: 'tester',
				like: '6',
				id: '0' },
			  { _id: 5cc879b25a9e230608369d15,
				username: 'tester',
				like: '7',
				id: '0' }
		]
	}
	Error 
	{
		return error;
	}
}
4. Add item in Favourite List

You can call this api to add the item to the account. Pass the `username`, and `likeItem` to the server would save the item that user wanted.
```
{
	url: "http://127.0.0.1:4242/addfavourlist",
	type: "POST",
	data: "username="+username+"&"+"like="+likeItem   
	Result
	{
		"username": 'tester',
		"like": '1',
		"id": '0'
	}
	Error 
	{
		return error;
	}
}
```
The result will have 3 suitation, if can't find the user, it will return `error` ; Or, if the user have already saved the item before, the system will return `fail` to told the user they have liked the item before, not needed to like again; Or, if the user have liked it before, also call this api to add the item to server, the system will return the result, which is `success` case.

5. Remove item in Favourite List

You can call this api to remove the item to the account. Pass the `username`, and `removeItem` to the server would delete the item that user don't wanted.

```
{
	url: "http://127.0.0.1:4242/removefavourlist",
	type: "POST",
	data: "username="+username+"&"+"like="+removeItem   
	Result
	{
		"username": 'tester',
		"like": '1',
		"id": '0'
	}
	Error 
	{
		return error;
	}
}
```
