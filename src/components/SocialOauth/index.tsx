import React from 'react'
import * as Icons from '@ant-design/icons'
import { getLocationOrigin } from '@/utils'
import { SocialContainer } from '@components/SocialOauth/index.style'

function SocialOauth (props) {
  const {getAuthThirdPart} = props
  const thirdPartSignIn = (e, type)=>{
    e.stopPropagation();
    const redirectUrl = getLocationOrigin() + '/oauth/redirect'
    getAuthThirdPart(type, redirectUrl);
  };

  return (
    <SocialContainer>
      <div className="social-line"><span className="text-muted">其他方式登录</span></div>
      <ul className="social-auth-list">
        <li>
          <Icons.WechatOutlined title="微信" className="social-icon social-wechat" onClick={(e) => thirdPartSignIn(e, 'wechat')} />
        </li>
        <li>
          <Icons.QqOutlined title="QQ" className="social-icon social-qq" onClick={(e) => thirdPartSignIn(e, 'qq')} />
        </li>
        {/*<li>
          <Icons.GithubOutlined title="Github" className="social-icon social-github" onClick={(e) => thirdPartSignIn(e, 'github')} />
        </li>*/}
        <li>
          <Icons.DingdingOutlined title="钉钉" className="social-icon social-dingding" onClick={(e) => thirdPartSignIn(e, 'dingding')} />
        </li>
      </ul>
    </SocialContainer>
  )
}

export default React.memo(SocialOauth);
