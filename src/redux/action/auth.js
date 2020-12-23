import Axios from "axios";
import { API_HOST } from "../../config";
import { showToast, storeData } from "../../utils";
import { setLoading } from "./global";

export const signUpAction = (dataRegister, photoReducer, navigation) => (
  dispatch
) => {
  Axios.post(`${API_HOST.uri}/register`, dataRegister)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      storeData("token", { value: token });
      if (photoReducer.isUploadPhoto) {
        const photoForUpload = new FormData();
        photoForUpload.append("file", photoReducer);
        console.log(
          "ISI FOTO SEBELUM UPLOAD photoForUpload",
          JSON.stringify(photoForUpload)
        );
        console.log("ISI FOTO SEBELUM UPLOAD photoReducer", photoReducer);
        Axios.post(`${API_HOST.uri}/user/photo`, photoForUpload, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            console.log("UPLOAD FOTO SUKSES", res);
            profile.profile_photo_url = `https://foodmarket-backend.buildwithangga.id/storage/${res.data.data[0]}`;
            storeData("userProfile", profile);
            navigation.reset({ index: 0, routes: [{ name: "SuccessSignUp" }] });
          })
          .catch((err) => {
            console.log(err);
            showToast(err);
            navigation.reset({ index: 0, routes: [{ name: "SuccessSignUp" }] });
          });
      } else {
        storeData("userProfile", profile);
        navigation.reset({ index: 0, routes: [{ name: "SuccessSignUp" }] });
      }
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showToast(
        err?.response?.data?.message ?? "Eror tidak diketahui",
        "danger"
      );
    });
};

export const signInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post("http://foodmarket-backend.buildwithangga.id/api/login", form)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      storeData("userProfile", profile);
      storeData("token", { value: token });
      navigation.reset({ index: 0, routes: [{ name: "MainApp" }] });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      showToast(
        err?.response?.data?.message ?? "Eror tidak diketahui",
        "danger"
      );
      dispatch(setLoading(false));
    });
};
