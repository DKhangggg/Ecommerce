import {Outlet} from "react-router-dom";
import {SideBar} from "../Sidebar/SideBar";
import Header from "../Header/Header";
import "./ProfileLayout.css";
import {SELLER_SIDEBAR_ITEMS} from "../../mocks/SellerNavItem.ts";
import Footer from "../Footer/Footer.tsx";

export default function SellerLayout() {
    return (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
            <Header/>

            <main className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: "1.5rem",
                        width: "100%",
                    }}
                    className="flex-col md:flex-row"
                >
                    <aside
                        style={{
                            width: "256px",
                            flexShrink: 0,
                            alignSelf: "flex-start",
                        }}
                        className="w-full md:w-64"
                    >
                        <div className="sidebar-wrapper">
                            <SideBar
                                title="Tài khoản"
                                useLink
                                items={SELLER_SIDEBAR_ITEMS}
                            />
                        </div>
                    </aside>

                    <div
                        style={{
                            flex: 1,
                            minWidth: 0,
                            width: "100%",
                        }}
                        className="flex-1 min-w-0"
                    >
                        <div className="profile-content-wrapper">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
