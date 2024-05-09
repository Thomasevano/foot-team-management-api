export const getPlayersSerializer = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          players: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                dateOfBirth: { type: 'string' },
                nationality: { type: 'string' },
              }
            }
          }
        }
      },
    },
    tags: ['players']
  },
}