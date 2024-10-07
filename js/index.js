// *loading all phones with api

const loadAllPhones = async (status, brandName) => {
  document.getElementById("spinner").style.display = "none";

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );
  const data = await res.json();
  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

// *displaying all phones

const displayAllPhone = (phones) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    console.log(phone);
    const { brand, phone_name, slug, image } = phone;
    const card = document.createElement("div");
    card.classList = "card m-2 bg-base-100 w-96 shadow-xl";
    card.innerHTML = `
      <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(card);
    console.log(card);
    console.log(phoneContainer);
  });
};

// *handling search button
const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchText = document.getElementById("search-box").value;

  setTimeout(function () {
    loadAllPhones(false, searchText);
  }, 3000);
};
// *handling showing all phone
const handleShowAll = () => {
  loadAllPhones(true);
};

// *handling details button

const phoneDetails = async (slugs) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await res.json();
  console.log(data.data);
  const { brand, image, slug } = data.data;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
             <h3 class="text-lg font-bold">${brand}</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  `;
  my_modal_1.showModal();
};

loadAllPhones(false, "iphone");
