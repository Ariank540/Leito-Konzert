// Basic HTTP byte-range test only. Does not test video decoding or rendering.
const url="https://pub-34d142b2772a4ad5b65e811325f580fd.r2.dev/uploads/20261021_101517_photo_1792570283_0_50D52B.mov";
try {
  const response=await fetch(url,{headers:{Range:"bytes=0-0"},signal:AbortSignal.timeout(20000)});
  console.log(JSON.stringify({status:response.status,contentType:response.headers.get("content-type"),contentRange:response.headers.get("content-range"),contentLength:response.headers.get("content-length")},null,2));
  await response.body?.cancel();
  if(!response.ok)process.exitCode=1;
} catch(error){console.error("R2 access FAILED:",String(error));process.exitCode=1;}
