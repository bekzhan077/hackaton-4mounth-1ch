import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { usePinContext } from "../contexts/PinContext";
const defaultTheme = createTheme();
const EditPinPage = () => {
  const { editPin, getOnePin, pin } = usePinContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formVal, setFormVal] = React.useState({
    title: "",
    image: "",
    category: "",
    size: "",
  });

  React.useEffect(() => {
    getOnePin(id);
  }, []);

  React.useEffect(() => {
    if (pin) {
      setFormVal(pin);
    }
  }, [pin]);

  function handleChange(e) {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formVal.title.trim() ||
      !formVal.image.trim() ||
      !formVal.category.trim() ||
      !formVal.size.trim()
    ) {
      return;
    }
    editPin(id, formVal);
    navigate("/");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Pin
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formVal.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              value={formVal.image}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                value={formVal.size}
                onChange={handleChange}
                label="Size"
                name="size"
              >
                <MenuItem value={"small"}>Small</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"large"}>Large</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formVal.category}
                onChange={handleChange}
                label="Category"
                name="category"
              >
                <MenuItem value={"car"}>Cars</MenuItem>
                <MenuItem value={"animal"}>Animal</MenuItem>
                <MenuItem value={"anime"}>Anime</MenuItem>
                <MenuItem value={"videogame"}>VideoGames</MenuItem>
                <MenuItem value={"art"}>art</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Pin
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditPinPage;
