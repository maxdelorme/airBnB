import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  // No permissions request is necessary for launching the image library.
  // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
  // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
  // so the app users aren't surprised by a system dialog after picking a video.
  // See "Invoke permissions for videos" sub section for more details.
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert(
      "Permission required",
      "Permission to access the media library is required."
    );
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

const takePicture = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    alert(
      "Merci d'autorisé l'application à accéder à votre position dans vos paramètres de sécurité"
    );
    return;
  }
  const result = await ImagePicker.launchCameraAsync();
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export { pickImage, takePicture };
