import React from 'react'

function Toast({type,msg}) {
    const variantOfToast = {
      Success: ["toast_success", "fa-shield-check"],
      Info: ["toast_info", "fa-info-circle"],
      Warning: ["toast_warning", "fa-exclamation-circle"],
      Error: ["toast_error", "fa-times-circle"],
    };
  return (
    <div class="toast_wrapper toast_rightside my-x-small">
      <div class={`toast ${variantOfToast[type][0]}`}>
        <i class={`far ${variantOfToast[type][1]} fa-2x toast_icon`}></i>
        <div class="toast_content">
          <span class="toast_heading">{type}</span>
          <span class="toast_body">{msg}</span>
        </div>
        <i class="far fa-times-circle fa-lg toast_dismiss"></i>
      </div>
    </div>
  );
}

export default Toast