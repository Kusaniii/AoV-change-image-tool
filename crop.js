(() => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.src = url;

    img.onload = () => {
      const box = document.createElement("div");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const cropBtn = document.createElement("button");
      const originalBtn = document.createElement("button");

      canvas.width = 372;
      canvas.height = 586;

      box.style = `
        position: fixed;
        inset: 10px;
        background: #111;
        z-index: 999999;
        text-align: center;
        padding: 10px;
      `;

      canvas.style = `
        width: 100%;
        touch-action: none;
        display: block;
      `;

      cropBtn.textContent = "Crop";
      originalBtn.textContent = "Gốc";

      box.append(canvas, cropBtn, originalBtn);
      document.body.append(box);

      let scale = Math.max(
        372 / img.width,
        586 / img.height
      );

      let cropW = 372 / scale;
      let cropH = 586 / scale;

      let x = (img.width - cropW) / 2;
      let y = (img.height - cropH) / 2;

      let dragging = false;
      let lastX = 0;
      let lastY = 0;


      function draw() {
        ctx.clearRect(0, 0, 372, 586);

        ctx.drawImage(
          img,
          x,
          y,
          cropW,
          cropH,
          0,
          0,
          372,
          586
        );
      }


      draw();


      function move(px, py) {
        const rect = canvas.getBoundingClientRect();

        x -= ((px - lastX) / rect.width) * cropW;
        y -= ((py - lastY) / rect.height) * cropH;

        x = Math.max(
          0,
          Math.min(x, img.width - cropW)
        );

        y = Math.max(
          0,
          Math.min(y, img.height - cropH)
        );

        lastX = px;
        lastY = py;

        draw();
      }


      canvas.addEventListener("pointerdown", e => {
        dragging = true;

        lastX = e.clientX;
        lastY = e.clientY;

        canvas.setPointerCapture(e.pointerId);
      });


      canvas.addEventListener(
        "pointermove",
        e => {
          if (!dragging) return;

          e.preventDefault();

          move(
            e.clientX,
            e.clientY
          );
        },
        {
          passive: false
        }
      );


      canvas.addEventListener(
        "pointerup",
        () => {
          dragging = false;
        }
      );


      function findTarget() {
        return [...document.images].find(img => {
          const r = img.getBoundingClientRect();

          return (
            Math.abs(r.width - 372) < 20 &&
            Math.abs(r.height - 586) < 20
          );
        });
      }


      cropBtn.onclick = () => {
        const target = findTarget();

        if (!target) {
          alert("Không tìm thấy ảnh");
          return;
        }

        target.src = canvas.toDataURL("image/png");

        box.remove();

        alert("Done");
      };


      originalBtn.onclick = () => {
        const target = findTarget();

        if (!target) {
          alert("Không tìm thấy ảnh");
          return;
        }

        target.src = url;

        box.remove();

        alert("Done");
      };
    };
  };


  input.click();
})();
