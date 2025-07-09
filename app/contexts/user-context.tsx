import React from "react";
import type { UserModel } from "@/models/user-model";

const UserContext = React.createContext<UserModel>({
	name: "titi",
	email: "titi@shad.com",
	avatar: "/avatar.avif",
});

export default UserContext;
