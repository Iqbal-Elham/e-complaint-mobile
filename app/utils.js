const get_type = (name) => {
  if (!name) return null;
  const extension = name.split('.').pop();
  let type = null;

  if (extension) {
    if (['jpg', 'png', 'webp', 'gif', 'jpeg'].indexOf(extension) !== -1)
      type = 'image';
    else if (['mp4', 'mov', 'mkv', 'avi'].indexOf(extension) !== -1)
      type = 'video';
    else if (['mp3', 'ogg', 'wav'].indexOf(extension) !== -1) type = 'audio';
    else type = 'file';
  }
  return type;
};

export { get_type };
