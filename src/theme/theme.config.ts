import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: 'black',
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    Button: {
      colorError: '#D32F2F',
      colorErrorHover: '#ff4d4f',
      colorErrorActive: '#b71c1c'
    },
  },
};

export default theme;
