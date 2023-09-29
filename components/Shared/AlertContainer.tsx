const AlertContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="absolute right-0 w-max top-full h-screen pointer-events-none">
        <div
            className="fixed w-max rounded-md z-50 -translate-x-full -translate-y-full p-4 h-full overflow-y-auto flex flex-col-reverse no-scrollbar"
        >
            {children}
        </div>
    </div>
}

export default AlertContainer;