const container = document.getElementById("cardContainer");
const swipeLeft = document.querySelector(".swipe-indicator.left");
const swipeRight = document.querySelector(".swipe-indicator.right");

const cardImages = [
  "https://images.template.net/wp-content/uploads/2014/11/Sample-Basic-Resume-Templte.jpg",
  "https://tse2.mm.bing.net/th/id/OIP.a0WSvRyTX98tgilHqTkhzwHaKc?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://uploads-ssl.webflow.com/6023fdfa97944f09d6a27ac6/638074881958612aa6c6f17b_Resume.webp"
];

cardImages.forEach((src, index) => {
  const card = document.createElement("div");
  card.className = "job-card";
  const img = document.createElement("img");
  img.src = src;
  card.appendChild(img);
  container.appendChild(card);
});

let isDragging = false;
let startX = 0;
let currentCard = null;

function getTopCard() {
  return container.lastElementChild;
}

container.addEventListener("mousedown", (e) => {
  currentCard = getTopCard();
  if (!currentCard) return;
  isDragging = true;
  startX = e.clientX;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`;
  swipeLeft.style.opacity = deltaX < -50 ? 1 : 0;
  swipeRight.style.opacity = deltaX > 50 ? 1 : 0;
});

container.addEventListener("mouseup", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  isDragging = false;
  swipeLeft.style.opacity = 0;
  swipeRight.style.opacity = 0;
  handleSwipe(deltaX);
});

function handleSwipe(deltaX) {
  if (Math.abs(deltaX) > 50) {
    currentCard.style.transition = "transform 0.5s, opacity 0.5s";
    currentCard.style.transform = `translateX(${deltaX * 5}px) rotate(${deltaX / 2}deg)`;
    currentCard.style.opacity = 0;
    setTimeout(() => {
      currentCard.remove();
    }, 500);
  } else {
    currentCard.style.transition = "transform 0.3s";
    currentCard.style.transform = "translateX(0px) rotate(0deg)";
  }
}

// Resume upload functionality
const resumeUpload = document.getElementById('resumeUpload');
const resumeText = document.getElementById('resumeText');
const pdfCanvas = document.getElementById('pdfCanvas');


pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

resumeUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const uploadButton = document.querySelector('.upload-button-inside');
  

  uploadButton.style.display = 'none';

  if (fileExtension === 'txt') {

    pdfCanvas.style.display = 'none';
    resumeText.style.display = 'block';
    const text = await file.text();
    resumeText.textContent = text;
  } else if (fileExtension === 'pdf') {
    // Handle PDF files
    resumeText.style.display = 'none';
    pdfCanvas.style.display = 'block';
    
    const fileReader = new FileReader();
    fileReader.onload = async function() {
      const typedarray = new Uint8Array(this.result);
      
      try {
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = pdfCanvas;
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering PDF:', error);
        resumeText.style.display = 'block';
        pdfCanvas.style.display = 'none';
        resumeText.innerHTML = `<strong>Error loading PDF</strong><br><br>Could not render the PDF file.`;
      }
    };
    fileReader.readAsArrayBuffer(file);
  }
});

