// src/providers/AntdRegistry.tsx
"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export function useStaticFunctions() {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  const {
    message: messageApi,
    notification: notificationApi,
    modal: modalApi,
  } = App.useApp();

  React.useLayoutEffect(() => {
    message = messageApi;
    notification = notificationApi;
    modal = modalApi;
    setIsReady(true);
  }, [messageApi, notificationApi, modalApi]);

  return { isReady, message, notification, modal };
}

export default function AntdRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => createCache());

  const renderChildren = React.useMemo(() => {
    return (
      <ConfigProvider>
        <App>{children}</App>
      </ConfigProvider>
    );
  }, [children]);

  if (typeof window !== "undefined") {
    return renderChildren;
  }

  // Handle server-side rendering
  return (
    <StyleProvider cache={cache}>
      {renderChildren}
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    </StyleProvider>
  );
}
