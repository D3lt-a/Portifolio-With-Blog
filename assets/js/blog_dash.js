/* 
    /
    |
    |     FUNCTION TO SAVE AND SEND THE DATA TO THE LOCALSTORAGE
    |
    \
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('desc').value;
    const imageFile = document.getElementById('image').files[0];

    if (!title || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    const date = new Date().toISOString().split('T')[0];


    const handleImage = (base64Image = '') => {
      const blog = {
        title,
        description,
        image: base64Image,
        date
      };

      const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
      existingBlogs.push(blog);
      localStorage.setItem('blogs', JSON.stringify(existingBlogs));

      alert('Blog saved successfully!');
      form.reset();
      location.reload()
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function () {
        handleImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      handleImage();
    }
  });
});

/* 
    /
    |
    |     FUNCTION TO DELETE AND REFRESH THE PAGE AFTER DELETION
    |
    \
*/

const deleteBlog = (index) => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogs.splice(index, 1);
  localStorage.setItem('blogs', JSON.stringify(blogs));  
  location.reload();
};

/* 
    /
    |
    |     FUNCTION TO RETRIEVE DATA FROM LOCAL STORAGE ONLOAD AND POPULATE IT IN THE PAGE
    |
    \
*/

document.addEventListener('DOMContentLoaded', () => {
  const blogsContainer = document.querySelector('.blogs');

  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  if (blogs.length === 0) {
    blogsContainer.innerHTML = '<p style="text-align: center; color: #7b7b7b; font-size: 18px;">No Blogs yet, Check out Soon!!</p>';
    return;
}

  blogs.forEach(blog => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');

    const blogImage = document.createElement('img');
    blogImage.src = blog.image || ''; 
    blogImage.alt = 'Blog Image';
    blogCard.appendChild(blogImage);

    const container = document.createElement('div');
    container.classList.add('container');

    const blogTitle = document.createElement('h2');
    blogTitle.textContent = blog.title;
    container.appendChild(blogTitle);

    const blogsummary = document.createElement('h3');
    blogsummary.textContent = blog.summary;
    container.appendChild(blogsummary);

    const blogDescription = document.createElement('p');
    blogDescription.textContent = blog.description;
    container.appendChild(blogDescription);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    container.appendChild(actions);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';
    actions.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
       deleteBlog()
    });
    actions.appendChild(deleteButton);

    blogCard.appendChild(container);

    blogsContainer.appendChild(blogCard);
  });
});
