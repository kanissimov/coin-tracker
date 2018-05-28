import React from 'react';
import MuiAvatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-bottom: 0;
  }
`;

const Avatar = styled(MuiAvatar)`
  &&& {
    width: 30px;
    height: 30px;
  }
  img {
    width: 30px;
    height: 30px;
  }
`;

function CoinAvatar({ symbol, icon }) {
  return (
    <Wrapper>
      <Avatar src={icon} />
      <Typography variant="button" gutterBottom>{symbol}</Typography>
    </Wrapper>
  );
}

export default CoinAvatar;
