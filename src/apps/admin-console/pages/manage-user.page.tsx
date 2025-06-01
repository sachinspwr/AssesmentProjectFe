import { useGetAllUsersQuery, useSearchUserMutation } from "store/slices/user.slice";
import UserList from "../components/user-management/user-list.component";
import { VTitleWithIcon } from "@components/molecules/icon-title/v-title-with-icon.mol";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserFilter from "../components/user-management/user-filter.component";
import { useRef, useState } from "react";
import { SearchRequestDTO, UserRequestDTO } from "@dto/request";
import { VFilterRef } from "@components/organisms/filter/v-filter.organism";
import VFilterToggle from "@components/organisms/filter/v-filter-toggle.organism";

function ManageUserspage() {
  const navigate = useNavigate();
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

const { data: initialUsers, isLoading: loadingUsers } = useGetAllUsersQuery(
  undefined,
  { skip: !hasSearched || isSearchActive }
);

const [searchUser, { data: searchedUsers, isLoading: isSearching }] = useSearchUserMutation();

const users = (hasSearched && isSearchActive) ? searchedUsers : initialUsers?.data;
const isLoading = isSearching || loadingUsers;

const handleFilterApply = async (searchRequest: SearchRequestDTO<UserRequestDTO>) => {
    try {
      setHasSearched(true);
      setIsSearchActive(true);
      searchUser(searchRequest);
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  

const handleFilterReset = () => {
  setHasSearched(false);
  setIsSearchActive(false);
  searchUser(SearchRequestDTO.default([]));
};


  return (
    <div className="flex flex-col gap-4">
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate(-1)}>
        User Management
      </VTitleWithIcon>
      <div className="text-nowrap">
        <VFilterToggle ref={filterButtonRef} filterRef={filterRef} />
      </div>
      <UserFilter
        onApplyFilter={handleFilterApply}
        onReset={handleFilterReset}
        filterRef={filterRef}
        filterButtonRef={filterButtonRef}
      />
      <UserList
        data={hasSearched ? users : []}
        loading={isLoading}
        noDataMessage={
            hasSearched
              ? 'No data available for the selected filters.'
              : 'Apply a filter to see users.'
        }
      />
    </div>
  );
}

export default ManageUserspage;
