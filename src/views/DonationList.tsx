const DonationList = () => {

    return (

        <div className="w-80 h-40 flex flex-col justify-center gap-2 rounded-2xl shadow p-2 mt-2 ms-2"        >
            <div className="flex gap-2">
                <img className="bg-neutral-500 w-24 h-24 shrink-0 rounded-full" alt="" />
                <div className="flex flex-col">
                    <span className="font-bold text-neutral-700 italic">Card title</span>
                    <p className="line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non
                        dolor augue. Nunc dictum erat sit amet iaculis interdum. Ut neque
                        tellus, congue vel lectus aliquam, dignissim porttitor velit.
                    </p>
                </div>
            </div >
            <button className="hover:bg-primaryLight bg-secondaryLight font-bold text-neutral-50 rounded-2xl p-2">
                See more
            </button>
        </div>

    )
}

export default DonationList;