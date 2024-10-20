import AppLinkButton from "./AppLinkButton";

export default function OopsModal({ visible }: { visible: boolean }) {
  if (visible)
    return (
      <>
        <div className="absolute z-10 backdrop-blur-sm bg-white/30 h-full w-full"></div>
        <div className="absolute bg-black/70 py-10 pb-20 w-full flex px-4 h-full">
          <div className="bg-emerald-800 z-10 overflow-hidden max-w-lg rounded-lg m-auto text-white">
            <div className="overflow-auto p-5">
              <p className="text-xl font-bold mb-4">Oops.</p>
              <p className="text-sm">
                This must be boring for you right?We have got your covered. We
                will send the completed reports to you through the information
                you filled earlier. Thank you!
              </p>

              <div className="pt-7">
                <AppLinkButton
                  label="Close"
                  to={"/"}
                  primary
                  className="bg-emerald-600 px-4 hover:bg-emerald-600/50"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
