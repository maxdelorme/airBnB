const getFormData = (data, keys) => {
  const formData = new FormData();

  keys.forEach((key) => {
    let value = undefined;
    if (key === "photo") {
      const format = data[key].split(".").at(-1); // ["dqsdqs/",..., "jpg"]
      value = {
        uri: data[key], // slectedPicture
        name: `avatar.${format}`, // `chat.jpg`
        type: `image/${format}`, // `image/jpg`
      };
    } else {
      value = data[key];
    }

    formData.append(key, value);
  });

  return formData;
};
export default getFormData;
