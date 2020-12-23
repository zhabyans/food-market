import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../showToast";

export const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    showToast("data gagal di simpan");
  }
};

export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showToast("data gagal diambil");
  }
};
