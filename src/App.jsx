import Kdb from "./components/Kdb";
import Nav from "./components/Nav";
import NotificationProvider from "use-toast-notification";

function App() {
  return (
    <>
      <NotificationProvider
        config={{
          position: "top-right",
          isCloseable: false,
          showTitle: true,
          showIcon: true,
          duration: 15,
        }}
      >
        <div>
          <Nav />
          <Kdb />
        </div>
      </NotificationProvider>
    </>
  );
}

export default App;
