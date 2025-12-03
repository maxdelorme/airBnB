import { ButtonOutline, Container } from "../../components";
import { useRbnbContext } from "../../Context/AuthContext";

const Profile = () => {
  const { logout } = useRbnbContext();

  return (
    <Container>
      <ButtonOutline onPress={logout} text="Se Déconnecter">
        Se déconnecter
      </ButtonOutline>
    </Container>
  );
};

export default Profile;
