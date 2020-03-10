import React from "react";
import { connect } from "react-redux";
import { Add } from "@material-ui/icons";
import MemberTable from "./MemberTable";
import MemberForm from "./MemberForm";
import {
  addMemberAPIAction, // Create
  getMembersAPIAction, // Retrieve
  editMemberAPIAction, // Update
  deleteMemberAPIAction // Delete
} from "../actions/membersActions";
import SearchBar from "../../../common/components/SearchBar";
import CSVDownloader from "../../../common/components/CSVDownloader";

const initialState = {
  open: false,
  memberData: {},
  error: null
};

class Members extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    this.props.getMembersAPIAction();
  }

  openForm = (memberData = {}) => {
    this.setState({ open: true, memberData });
  };

  closeForm = () => {
    this.setState({ ...initialState });
  };

  addMember = memberData => {
    addMemberAPIAction(
      memberData,
      successResponse => {
        alert("Member Created Successfully");
        this.props.getMembersAPIAction();
        this.closeForm();
      },
      errorResponse => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  editMember = (memberId, memberData) => {
    // close form if fields unchanged
    if (!Object.keys(memberData).length) {
      this.closeForm();
      return;
    }

    editMemberAPIAction(
      memberId,
      memberData,
      successResponse => {
        alert("Member Updated Successfully");
        this.props.getMembersAPIAction();
        this.closeForm();
      },
      errorResponse => {
        console.log(errorResponse);
        this.setState({ error: errorResponse });
      }
    );
  };

  deleteMember = memberId => {
    deleteMemberAPIAction(
      memberId,
      successResponse => {
        alert("Member Deleted Successfully");
        this.props.getMembersAPIAction();
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  };

  render() {
    return (
      <div>
        <span style={styles.headerBar}>
          <SearchBar searchAPI={this.props.getMembersAPIAction} />
          <CSVDownloader data={this.props.members}/>
          <Add onClick={() => this.openForm()} />
        </span>

        {/* FORM (Details View) */}
        {this.state.open ? (
          <MemberForm
            open={this.state.open}
            closeForm={this.closeForm}
            formData={this.state.memberData}
            addMember={this.addMember}
            editMember={this.editMember}
            error={this.state.error}
          />
        ) : null}

        {/* TABLE (List View) */}
        <h2>Members</h2>
        <MemberTable
          members={this.props.members}
          showEditForm={this.openForm}
          performDelete={this.deleteMember}
        />
      </div>
    );
  }
}

const styles = {
  headerBar: { float: "right", marginRight: 20, display: "flex" }
};

const mapStateToProps = ({ members }) => {
  return { members };
};

const mapDispatchToProps = { getMembersAPIAction };

export default connect(mapStateToProps, mapDispatchToProps)(Members);
