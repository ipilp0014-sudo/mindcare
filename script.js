const srqQuestions=["Apakah Anda sering merasa tegang, cemas, atau khawatir?",
"Apakah Anda sulit tidur di malam hari?","Apakah Anda kehilangan minat terhadap hal-hal yang biasanya Anda sukai?",
"Apakah Anda sering merasa lelah tanpa sebab yang jelas?","Apakah Anda sering merasa sedih atau ingin menangis?",
"Apakah Anda sulit berkonsentrasi saat melakukan sesuatu?","Apakah Anda merasa tidak berguna atau rendah diri?",
"Apakah Anda merasa hidup tidak berharga?","Apakah Anda merasa tidak mampu menikmati aktivitas sehari-hari?",
"Apakah Anda merasa mudah marah atau tersinggung tanpa alasan jelas?","Apakah Anda merasa sulit mengambil keputusan?",
"Apakah Anda merasa kehilangan kepercayaan diri?","Apakah Anda merasa mudah takut tanpa alasan yang jelas?",
"Apakah Anda merasa sering gelisah atau tidak tenang?","Apakah Anda sering mengalami sakit kepala tanpa sebab yang jelas?",
"Apakah Anda merasa lebih sering menarik diri dari orang lain?","Apakah Anda merasa sulit bekerja atau menjalankan kegiatan sehari-hari?",
"Apakah Anda merasa sulit untuk berpikir jernih?","Apakah Anda merasa hidup Anda tidak bahagia atau tidak memuaskan?",
"Apakah Anda pernah memiliki pikiran untuk mengakhiri hidup Anda?"];
const dassQuestions=["Saya merasa tidak ada harapan untuk masa depan.",
"Saya merasa hidup tidak berarti.","Saya merasa sedih dan murung.",
"Saya merasa kehilangan minat terhadap hal-hal yang biasanya saya sukai.",
"Saya merasa tidak bersemangat untuk melakukan sesuatu.","Saya merasa diri saya tidak berharga.",
"Saya merasa tidak ada yang dapat membuat saya bahagia.","Saya merasa sangat tegang atau gugup.",
"Saya merasa sulit untuk tenang setelah sesuatu membuat saya kesal.",
"Saya merasa panik tanpa alasan yang jelas.","Saya merasa takut tanpa alasan yang jelas.",
"Saya merasa tubuh saya gemetar.","Saya merasa sesak napas tanpa aktivitas berat.",
"Saya merasa jantung saya berdebar tanpa sebab.","Saya merasa mudah tersinggung atau gelisah.",
"Saya merasa sulit untuk beristirahat atau rileks.","Saya merasa mudah marah atau frustrasi.",
"Saya merasa sulit bersabar terhadap hal-hal kecil.","Saya merasa sulit memaafkan kesalahan orang lain.",
"Saya merasa sulit menenangkan diri saat kesal.","Saya merasa mudah tertekan oleh tuntutan sehari-hari."];
const gadQuestions=["Merasa gugup, cemas, atau tegang.",
"Tidak bisa menghentikan atau mengontrol kekhawatiran.",
"Terlalu banyak khawatir tentang berbagai hal.","Kesulitan untuk rileks.",
"Merasa sangat gelisah sehingga sulit diam.","Mudah tersinggung atau marah.",
"Merasa takut seolah sesuatu buruk akan terjadi."];
const icons="iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AA..."; // Base64 placeholder
const container=document.getElementById('questions-container');

function loadQuestions(){
  srqQuestions.forEach((q,i)=>container.innerHTML+=`<div class="question"><img src="data:image/png;base64,${icons}" class="icon"><label>${i+1}. ${q}</label><select name="srq${i}" required><option value="">Pilih</option><option value="0">Tidak</option><option value="1">Ya</option></select></div>`);
  dassQuestions.forEach((q,i)=>container.innerHTML+=`<div class="question"><img src="data:image/png;base64,${icons}" class="icon"><label>${i+1}. ${q}</label><select name="dass${i}" required><option value="">Pilih</option><option value="0">Tidak Pernah</option><option value="1">Kadang-kadang</option><option value="2">Cukup Sering</option><option value="3">Sangat Sering</option></select></div>`);
  gadQuestions.forEach((q,i)=>container.innerHTML+=`<div class="question"><img src="data:image/png;base64,${icons}" class="icon"><label>${i+1}. ${q}</label><select name="gad${i}" required><option value="">Pilih</option><option value="0">Tidak Pernah</option><option value="1">Beberapa Hari</option><option value="2">Lebih dari Setengah Hari</option><option value="3">Hampir Setiap Hari</option></select></div>`);
}

loadQuestions();

document.getElementById('mentalForm').addEventListener('submit',e=>{
  e.preventDefault();
  const selects=document.querySelectorAll('#mentalForm select');
  for(let s of selects){if(s.value===""){alert("Silakan isi semua pertanyaan."); return;}}
  let srqTotal=0,dassTotal=0,gadTotal=0;
  selects.forEach((s,i)=>{
    const val=parseInt(s.value);
    if(i<srqQuestions.length) srqTotal+=val;
    else if(i<srqQuestions.length+dassQuestions.length) dassTotal+=val;
    else gadTotal+=val;
  });
  let gadKategori="";
  if(gadTotal<=4) gadKategori="Normal";
  else if(gadTotal<=9) gadKategori="Ringan";
  else if(gadTotal<=14) gadKategori="Sedang";
  else gadKategori="Berat";
  document.getElementById('hasil').innerHTML=`<h3>Hasil Survey</h3><p><b>SRQ-20:</b> ${srqTotal}</p><p><b>DASS-21:</b> ${dassTotal}</p><p><b>GAD-7:</b> ${gadTotal} (${gadKategori})</p><p>Rekomendasi: Jika skor tinggi, segera konsultasi psikolog/psikiater.</p>`;
});