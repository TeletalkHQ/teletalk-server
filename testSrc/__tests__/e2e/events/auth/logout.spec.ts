import chai from 'chai';

import { clientStore } from '~/classes/ClientStore';
import { services } from '~/services';

import { authHelper } from '@/classes/AuthHelper';
import { randomMaker } from '@/classes/RandomMaker';
import { utils } from '@/utils';

describe('logout success tests', () => {
	it('should get response.ok:true logging out user', async () => {
		const cellphone = randomMaker.cellphone();
		const fullName = randomMaker.fullName();
		const ah = authHelper(cellphone, fullName);

		await ah.createComplete();

		const clients = [{ clientId: ah.getClientId() }];

		for (let i = 0; i < 9; i++) {
			await ah.signIn();
			await ah.verify();
			clients.push({
				clientId: ah.getClientId(),
			});
		}

		const clientIdToRemove = clients.pop()!.clientId;
		const { userId } = (await clientStore.find(clientIdToRemove))!;

		await utils.requesterCollection
			.logout(ah.getClientSocket())
			.sendFullFeaturedRequest();

		const userFromDb = (await services.findOneUser({
			userId,
		}))!;

		const isClientExist = userFromDb.clients.some(
			({ clientId }) => clientId === clientIdToRemove
		);
		chai.expect(isClientExist).to.be.equal(false);

		clients.forEach((item) => {
			const isClientExist = userFromDb.clients.some(
				(i) => i.clientId === item.clientId
			);
			chai.expect(isClientExist).to.be.equal(true);
		});
	});
});

// await utils.asyncDescribe("logout fail tests", async () => {
//   const clientSocket = (await clientInitializer().createComplete()).getClient();
//   const requester = utils.requesterCollection.logout(clientSocket);

//   return () => {
//     e2eFailTestInitializerHelper(requester);
//   };
// });
