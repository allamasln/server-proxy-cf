fetch(
	'https://proxy-server-cf.onrender.com/proxy/tb_perfil/CF-16957150235826220228857316559'
)
	.then((res) => res.json())
	.then((data) => console.log(data))
