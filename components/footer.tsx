import { createClient } from "@/utils/supabase/server";
import FooterMotion from "./footer-motion";

export async function Footer() {
  let profile = null;
  let footerTagline = "Building things with care & craft.";

  try {
    const supabase = await createClient();
    const [{ data: profileData }, { data: configs }] = await Promise.all([
      supabase.from("profile").select("*").single(),
      supabase.from("site_config").select("*"),
    ]);
    profile = profileData;
    const configMap = Object.fromEntries(
      (configs || []).map((c) => [c.key, c.value]),
    );
    footerTagline = configMap.footer_tagline || footerTagline;
  } catch {
    // Use defaults
  }

  return <FooterMotion profile={profile} footerTagline={footerTagline} />;
}
