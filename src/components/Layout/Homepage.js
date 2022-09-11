import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import Collapse from "../UI/Collapse/Collapse";
import Button from "../UI/Button/Button";

const HomePage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flex justify-center h-screen items-center">
      <Card className="shadow-lg">
        <Collapse content={`Bem-vindo${authCtx.remember ? " de volta" : ""}!`}>
          <p>
            Siga em frente, olhe para o lado, se liga no botão de deslogar ali
            em baixo
          </p>
        </Collapse>
        <img src="https://c.tenor.com/Ripfrypdw1kAAAAd/sextou-dancing.gif" />
        <Button onClick={authCtx.onLogout} className="w-30" type="button">
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default HomePage;
