import { useQuery } from "@apollo/client";
import { GET_USER } from "@/queries";
import { UserData } from "@/types";
import UserCard from "./UserCard";
import StatsContainer from "./StatsContainer";

type UserProfileProps = {
  userName: string;
};
const UserProfile = ({ userName }: UserProfileProps) => {
  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });
  if (loading) return <div>loading...</div>;
  if (error) return <h2 className="text-xl">{error.message}</h2>;
  if (!data) return <h2 className="text-xl ">User not found</h2>;
  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    gists,
    followers,
    following,
  } = data.user;
  return (
    <div>
      <UserCard avatarUrl={avatarUrl} bio={bio} url={url} name={name} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />
    </div>
  );
};

export default UserProfile;
