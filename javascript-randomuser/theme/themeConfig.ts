// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#1ABB81',
    fontFamily: 'Prompt-Regular',
  },
  components: {
    Table: {
      headerBg: '#FFFFFF'
    }
  }
};

export default theme;
