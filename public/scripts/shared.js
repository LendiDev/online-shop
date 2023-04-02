function goBack(event) {
  if ('referrer' in document) {
    window.location = document.referrer;
    /* OR */
    //location.replace(document.referrer);
} else {
    window.history.back();
}
}