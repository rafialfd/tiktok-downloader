function download() {
  let URL = document.getElementById("url").value;

  fetch("/get-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: URL }),
  })
    .then((res) => res.json())
    .then((data) => {
      const videoURL = data.data.play;
      const fileName = `${data.data.author.unique_id} - ${data.data.title}`;
      console.log(data);

      fetch(videoURL)
        .then((result) => result.blob())
        .then((blob) => {
          const urlBLOB = window.URL.createObjectURL(blob);
          const a = document.getElementById("download");
          a.href = urlBLOB;
          a.download = `${fileName}.mp4`;
          a.click();
          window.URL.revokeObjectURL(urlBLOB);
        });
    });
}
