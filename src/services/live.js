import request from "@/utils/request";
import config from "@/config";

export function apiLiveBanner() {
  return request.get(config.api.live.banner, {
    custom: { loadingType: "nav" }
  });
}
