import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/db/supabaseClient";
import { useEffect, useState } from "react";

export const Login = () => {
  const [idClient, setIdClient] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const userId = session.user.id;

          // Query the user_profile table to get the id_client
          const { data, error } = await supabase
            .from("user_profile")
            .select("*")
            .eq("id_user", userId)
            .single();

          if (error) {
            console.error("Error fetching id_client:", error);
          } else {
            setIdClient(data?.id_client);
            localStorage.setItem("user", JSON.stringify(session.user, data));
          }
        }
      },
    );

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
      {idClient && <p>Your Client ID: {idClient}</p>}
    </>
  );
};
