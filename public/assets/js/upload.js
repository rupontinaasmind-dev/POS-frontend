// Upload Box JavaScript
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const thumbnailRow = document.getElementById('thumbnailRow');
const mainImageInput = document.getElementById('mainImageInput');
const mainImageFileName = document.getElementById('mainImageFileName');
let uploadedFiles = [];
let mainImageFile = null;

// Click to upload
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

// Main image input change
mainImageInput.addEventListener('change', handleMainImage);

// File input change
fileInput.addEventListener('change', handleFiles);

// Drag and drop
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#3C50E0';
    uploadBox.style.backgroundColor = '#f0f4ff';
});

uploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#e5e7eb';
    uploadBox.style.backgroundColor = 'transparent';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#e5e7eb';
    uploadBox.style.backgroundColor = 'transparent';
    
    const files = Array.from(e.dataTransfer.files);
    handleImageFiles(files);
});

function handleMainImage(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        mainImageFile = file;
        mainImageFileName.textContent = file.name;
        mainImageFileName.style.color = '#64748B';
    } else {
        mainImageFile = null;
        mainImageFileName.textContent = 'No file chosen';
        mainImageFileName.style.color = '#9CA3AF';
    }
}

function clearMainImage() {
    mainImageInput.value = '';
    mainImageFile = null;
    mainImageFileName.textContent = 'No file chosen';
    mainImageFileName.style.color = '#9CA3AF';
}

function handleFiles(e) {
    const files = Array.from(e.target.files);
    handleImageFiles(files);
}

function handleImageFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
        if (uploadedFiles.length < 4) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const imageData = {
                    name: file.name,
                    url: e.target.result,
                    file: file
                };
                
                uploadedFiles.push(imageData);
                displayThumbnails();
            };
            
            reader.readAsDataURL(file);
        } else {
            alert('Maximum 4 images allowed');
        }
    });
}

function displayThumbnails() {
    thumbnailRow.innerHTML = '';
    
    uploadedFiles.forEach((imageData, index) => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-container';
        
        thumbnailContainer.innerHTML = `
            <img src="${imageData.url}" alt="${imageData.name}" class="thumbnail-image">
            <button type="button" class="remove-btn" onclick="removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        thumbnailRow.appendChild(thumbnailContainer);
    });
}

function removeImage(index) {
    uploadedFiles.splice(index, 1);
    displayThumbnails();
}

// Get uploaded files function
function getUploadedFiles() {
    return uploadedFiles;
}

// Get main image file function
function getMainImageFile() {
    return mainImageFile;
}

// Clear all uploads function
function clearUploads() {
    uploadedFiles = [];
    displayThumbnails();
}

// Make functions global
window.removeImage = removeImage;
window.getUploadedFiles = getUploadedFiles;
window.clearUploads = clearUploads;
window.clearMainImage = clearMainImage;
window.getMainImageFile = getMainImageFile;
