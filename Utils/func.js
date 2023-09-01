const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    const message = json.error ? `${json.message}:${json.error}`: json.message;
  throw new Error('Request failed '+ message || response.statusText);
  }
  return json;
};
//const formatDate = new Date(time_added).toLocaleDateString('en-US', {
//  hour12: false
//});

export {doFetch};
