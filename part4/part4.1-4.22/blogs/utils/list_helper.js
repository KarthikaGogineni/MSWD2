const dummy = (blogs) => {

return 1;
}
const totalLikes = (blog) => {
	let sum = 0
	for (var i = 0; i < blog.length; i++) {
		sum = sum+blog[i].likes
	}
	return sum
}
const favBlog = (blogs) => {
	var max = 0
	var fav_blog

	for (var i = 0; i < blogs.length; i++) {
		if (blogs[i].likes >max) {
			max = blogs[i].likes
			fav_blog = blogs[i]
		}
	}

	return fav_blog
}

module.exports = {
  dummy,
  totalLikes,
  favBlog
}
