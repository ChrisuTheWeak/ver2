const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('request failed');
  }
  const json = await response.json();
  return json;
};
//const formatDate = new Date(time_added).toLocaleDateString('en-US', {
//  hour12: false
//});

export {doFetch};
