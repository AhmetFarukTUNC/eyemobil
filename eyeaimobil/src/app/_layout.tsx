
import { Tabs, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");

        if (
          !userId &&
          pathname !== "/login" &&
          pathname !== "/signup"
        ) {
          router.replace("/login");
          return;
        }

        if (
          userId &&
          (pathname === "/login" || pathname === "/signup")
        ) {
          router.replace("/");
          return;
        }

        setAuthChecked(true);
      } catch (error) {
        console.log("Login check error:", error);
        router.replace("/login");
      }
    };

    checkLogin();
  }, [pathname]);

  if (!authChecked) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#1769E0",
        tabBarInactiveTintColor: "#8A96A8",

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E8ECF2",
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ABOUT */}
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* CONTACT */}
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="mail-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PREDICT */}
      <Tabs.Screen
        name="predict"
        options={{
          title: "Predict",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="scan-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PATIENTS */}
      <Tabs.Screen
        name="patients"
        options={{
          title: "Patients",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="people-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* HIDDEN ROUTES */}

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />

      <Tabs.Screen
        name="signup"
        options={{
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
    </Tabs>
  );
}

