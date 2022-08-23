import { Colors } from "../styles/colors";
import { Grid } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
  backgroundFilled?: boolean;
};

const ContentContainer = ({ children, backgroundFilled }: Props) => {
  return (
    <Grid container style={{ padding: 15 }}>
      <Grid
        container
        style={{
          padding: 10,
          borderRadius: 10,
          background: backgroundFilled
            ? `linear-gradient(${Colors.green}, ${Colors.darkGreen})`
            : "",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default ContentContainer;
